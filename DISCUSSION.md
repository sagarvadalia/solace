# Post submission fast follows

## performance optimizations

- filtering, pagination, sorting, etc all on the backend. This is standard practice for datatables and is far more performant than doing these operations client side. Particularly because dbs can be optimized for this via db index
- aforementioned db indexes -> we should be covering sort operations, filters, etc with db index. IE perhaps an index on firstName if that is was we sort by on the backend

## Frontend improvements

- the specialties column in the table is very cumborsome. Ideally, we'd drop in some badges and render the first three with a see more button that pops open the full list
- Styling issues. In this project, my focus was more on functionality + UX. There are a number of glaring styling issues -> IE the navbar spacing, the sort buttons not rendering an obvious asc/desc icon, the lack of care put into the global theme.
- UX issues -> our table is pretty limited in functionality. It would have been great to set up standard crud behavior (add, edit, delete) for advocates.
