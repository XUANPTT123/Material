import { expect, test } from '@playwright/test';
import { RegisterPage } from '../page/Register.page';
import { ProductPage } from '../page/Product.page';

const inforUser = [
    { userName: 'Xuan', email: 'xuan@gmail.com' },
    { userName: 'Xuan', email: 'xuangmail.com' },
    { userName: '', email: '' },
    { userName: '', email: 'xuan@gmail.com' },
    { userName: 'Xuan', email: '' }
];

const inforUser2 = {
    country: 'canada',
    date: '2025-10-24',
    inputfile: 'D:/Playwrite/Material/tests/xuanhihi.png',
    biography: 'hahahahahahahahahahaha',
    rate: '5',
    color: '#ff66cc',
    rating: '',
}

const objectProduct1 = { 'Product 1': 1, 'Product 2': 1, 'Product 3': 1 };
const objectProduct2 = { 'Product 1': 3, 'Product 2': 3, 'Product 3': 3 };
const objectProduct3 = { 'Product 1': 1, 'Product 2': 2, 'Product 3': 3 };
const objetProduct = [objectProduct1, objectProduct2, objectProduct3];


test.describe('Register Page', () => {
    let register: RegisterPage;

    test.beforeEach('Goto Material page', async ({ page }) => {
        register = new RegisterPage(page);
        await register.gotoMaterial();
        await register.gotoRegister();
    })

    test.afterEach('Delete register', async ({ page }) => {
        await test.step('Xoa data', async () => {
            await register.delete();
        })
    })

    test('Register pass + Fail', async ({ page }) => {
        for (let i of inforUser) {
            await test.step(`nhập thông tin ${i.userName} và ${i.email}`, async () => {
                await register.addRegister(i);
                await register.clickRegister();

                //verify data
                if (i.userName && i.email && i.email.includes('@')) {
                    await register.verifyDataRegister(i);
                } else {
                    await register.verifyDataRegisterFail(i);
                }
            })
        }
    })

    test('Register with all information', async ({ page }) => {
        await test.step('Đăng ký thành công với all thông tin', async () => {
            await register.addRegister(inforUser[0]);
            await register.addRegisterNotRequire(inforUser2);
            await register.clickRegister();

            //verify data
            await register.verifyDataRegister(inforUser[0], inforUser2);
        })
    })

    // test('Check UI', async({page}) => {

    // })
})

test.describe('Product Page', () => {
    let product: ProductPage;

    test.beforeEach('goto product page', async ({ page }) => {
        product = new ProductPage(page);
        await product.gotoMaterial();
        await product.gotoProductPage();
    })

    test('Add item in cart', async ({ page }) => {
        for (let i of objetProduct) { //i = objectProduct1
            await page.reload(); //reload lại sau mỗi object 
            for (const [key, value] of Object.entries(i)) {
                await product.addItem(key, value);
            }
        }
    })

    test('Remove item', async ({ page }) => {
        //remove 1 sp, remove nhiều sp, remove nhiều sản phẩm giống nhau 
    })
})