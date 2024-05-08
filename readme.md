Untuk menjalankan Server : 

1. npm i
2. npx sequelize db:create
3. npm run seed
4. npm run start


Terdapat 4 Tabel

- User
- Customer
- Product
- Order

catatan :

- Untuk Validasi sudah ditambahkan seperi required, unique, email
- Sudah menggunakan JWT
- Sudah menggunakan Bcryptjs untuk hashing password
- Ketika Create Order, maka stock product akan berkurang, atau ketika stock tidak cukup maka eror
- ketik Order dihapus, maka stock akan product akan kembali
- Untuk Request Password sebenarnya lebih baik response Link dikirim ke email menggunakan nodemailer, namun
  dengan kondisi sekarang sudah bisa di akses link nya sebagai link reset password, dan ketika di reset juga      
  berhasil.

