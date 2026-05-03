import express from 'express';
import path from 'path';
import { setUser } from './middleware/rbacMiddleware'; // Import setUser
import userRoutes from './routers/userRoutes';
import roleRoutes from './routers/roleRoutes';
import permissionRoutes from './routers/permissionRoutes';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Panggil setUser di sini agar berjalan di semua request
app.use(setUser); 

app.get('/', (req, res) => res.redirect('/users'));

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});