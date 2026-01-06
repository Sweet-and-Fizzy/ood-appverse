# Fetch Timing: Pagination Performance Considerations

## Problem

With the pagination fix (`c29e5a0`), we now fetch all pages of software and apps from Drupal's JSON:API before displaying any content. Each page returns 50 items, so:

- 150 software items = 3 sequential requests
- 200 software items = 4 sequential requests
- etc.

The user sees a loading spinner until **all** pages are fetched. As the dataset grows, initial load time increases linearly.

Current flow:
```
Page 1 (50 items) → wait → Page 2 (50 items) → wait → Page 3 (50 items) → done → show UI
```

## Proposed Solutions

### Option 1: Increase Drupal's page limit (Recommended - Server-side)

Have the Drupal admin increase the JSON:API page limit so all items come in one request.

**Pros:**
- Single request, fastest option
- No frontend changes needed
- Simplest solution

**Cons:**
- Requires Drupal configuration change
- Larger single payload

**Implementation:** In Drupal, configure JSON:API to allow `page[limit]=500` or higher.

---

### Option 2: Progressive loading (Frontend)

Show partial results as each page loads, letting users browse while remaining pages fetch in the background.

**Pros:**
- Perceived performance improvement
- Users can start browsing immediately

**Cons:**
- More complex state management
- Filters may behave unexpectedly until all data loads
- UI shifts as new items appear

**Implementation:** Stream results into state as each page completes, with a "loading more..." indicator.

---

### Option 3: Parallel page fetching (Frontend)

If we know the total count upfront, fetch all pages simultaneously.

**Pros:**
- Faster than sequential fetching
- All data still loads before UI renders

**Cons:**
- JSON:API doesn't always provide total count upfront
- Could overwhelm the server with concurrent requests
- Still delays initial render

**Implementation:** First request gets total, then `Promise.all()` remaining pages.

---

### Option 4: Server-side filtering (API change)

Move filtering to the server, only fetching matching results.

**Pros:**
- Only fetch what's needed
- Scales to any dataset size

**Cons:**
- Significant refactor of filter UI
- Each filter change = new API request
- Loses instant client-side filtering UX

**Implementation:** Use JSON:API filter syntax, paginate filtered results.

---

## Recommendation

**Short-term:** Option 1 (increase Drupal page limit) is the simplest fix with the best performance.

**Long-term:** If the dataset grows significantly (500+ items), consider Option 2 (progressive loading) or Option 4 (server-side filtering).

## Current Behavior

The app waits for all pages before rendering. This ensures:
- Filters work correctly on the complete dataset
- No UI shifting as data loads
- Consistent user experience

The tradeoff is a longer initial load time as the dataset grows.
