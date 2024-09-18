# First Part

Technology used- Express, NextJS, Prisma, Postgres, React Query, ShadCN
User can login and signup. Authentication is secured by JWT token and user password is hashed.

# Second Part

Creating product form is a multi step form. All the forms on the project is validated properly both in frontend and backend side. frontend uses sync validations only. async validation is done on backend.

# Third Part

To solve this part first several models, pivots related to user, product, rent, buy was created.
A user can add, buy, rent a product from the list of products. If a product of a particular user is bought or rented by another user then it would be count as sold or lent product for user. User can delete his own products also.

# Corner cases/ Unfinished parts

1. Product rent and edit was not implemented on front end due to lack of time. Althogh api was created for them.
2. Product is cascaded with other table. So user deleting product would delete it from the buy or rent tables also. Which could be handled with a main product table and a listed product table.
