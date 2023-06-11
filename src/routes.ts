import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DatailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateOrderController } from './controllers/orders/CreateOrderController';
import { RemoveOrderController } from './controllers/orders/RemoveOrderController';
import { AddItemController } from './controllers/orders/AddItemController';
import { RemoveItemController } from './controllers/orders/RemoveItemController';
import { SendOrderController } from './controllers/orders/SendOrderController';
import { ListOrderController } from './controllers/orders/ListOrderController';
import { DetailOrderController } from './controllers/orders/DetailOrderController';
import { FinishOrderController } from './controllers/orders/FinishOrderController';

import { isAuthentication } from './middlewares/isAuthentication';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//ROTAS USERS
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthentication, new DetailUserController().handle);

//ROTAS CATEGORY
router.post('/category', isAuthentication, new CreateCategoryController().handle);
router.get('/category', isAuthentication, new ListCategoryController().handle);

//ROTAS PRODUCT
router.post('/product', isAuthentication, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthentication, new ListByCategoryController().handle);

//ROTAS ORDER
router.post('/order', isAuthentication, new CreateOrderController().handle);
router.delete('/order', isAuthentication, new RemoveOrderController().handle);
router.post('/order/item', isAuthentication, new AddItemController().handle);
router.delete('/order/remove', isAuthentication, new RemoveItemController().handle);
router.put('/order/send', isAuthentication, new SendOrderController().handle);
router.get('/orders', isAuthentication, new ListOrderController().handle);
router.get('/order/detail', isAuthentication, new DetailOrderController().handle);
router.put('/order/finish', isAuthentication, new FinishOrderController().handle);

export { router };