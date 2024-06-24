import { Router } from 'express';
const router = Router();
// const {home,create}=require("../controller/main")
import passport, { authenticate } from "passport";

import { main, createUser, create, activationAccount, regenerateActivationCode, actToken, login, update, deleteStudent, findOne, logOut, forgotPassLink, updatePass, storeMultistepForm, formDetails, idDetails, updateMultistepForm, deleteMultistepData, storeProducts, getProducts } from "../controller/tutorial.controller";

router.get('/message', main)

// router.get('/',student.home);

router.post('/create', createUser);

router.post('/create-student', create)

router.get('/activation-account/:token/:email', activationAccount);

router.get('/reactivation-code/:email', regenerateActivationCode)

router.get('/act-code/:email', actToken)

router.post('/login', login)

// router.get('/findAll', findAll)

// router.get('/findOne/:id',student.findOne)

router.post('/update/:id', update)

router.post('/delete/:id', deleteStudent)

router.post('/delete-multiform-data/:id', deleteMultistepData)

router.get('/old-details/:id', findOne)

router.post('/logout', logOut)

router.post('/forgot-password', forgotPassLink)

router.post('/update-pass/:email', updatePass)

router.post('/multi-step-datastore', storeMultistepForm)

router.post('/store-products', storeProducts)

router.post('/multi-step-dataupdate/:id', updateMultistepForm)

router.get('/form-details', formDetails);

router.get('/id-details/:id', idDetails);

router.get('/get-products', getProducts);

export default router;