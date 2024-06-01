todo list->

1. start the db, set it with prisma, try on local listening
   db- teebayDB
   table-> user, profile, product, category, product-rented, product-sold

user-> email, pass
profile -> fname, lname, adress, phone
category-> type
brand-> name
product-> title, category^, brand^, selling_price, rent_price_per_hour, viewCount
product-sold-> product_id, buyer_id, seller_id
product-rented-> product_id, renter_id, owner_id, rentingTime, rentHourDuration

func->
+user-> signUpUser, signInUser, getProductsByUser, getProductsSoldByUser, getProductsRentedByUser, getProductsBoughtByUser, getProductsLentByUser

+product-> addProduct, sellProduct, editProduct, deleteProduct, getAllProducts
