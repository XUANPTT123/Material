import { expect, Locator, Page, test } from '@playwright/test';
import { MaterialPage } from './Material';

export class RegisterPage extends MaterialPage {
    page: Page;
    tableBody : Locator;

    RegisterURL = '01-xpath-register-page.html';
    locatorMaterial = { 
        xpathUserName : '#username',
        xpathEmail : '#email',
        xpathGender : '#male',
        xpathHobbies :'#reading',
        xpathInterest : "//*[@value = 'music']",
        xpathCountry : "#country",
        xpathDateOfBirth : '#dob',
        xpathProfilePicture : '#profile',
        xpathBiography : '#bio',
        xpathRate : '#rating',
        xpathColor : '#favcolor',
        xpathNewLetter : '#newsletter',
        xpathEnableFeatur : 'span',
        xpathStarRating : '#starRating',
    }
    
    xpathBtnRegister = "//*[text()='Register']";

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.tableBody = page.locator('#userTable tbody'); //lấy tbody cuối cùng của bảng 
    }

    async gotoRegister() {
        const register = this.baseURL + this.RegisterURL;
        await this.page.goto(register);
    }

    //hàm đăng ký 
    async addRegister(inforUser: { userName ?: string; email?: string }) {
        if (inforUser.userName !== undefined) {
            await this.page.locator(this.locatorMaterial.xpathUserName).fill(inforUser.userName);
        }
        if (inforUser.email !== undefined) {
            await this.page.locator(this.locatorMaterial.xpathEmail).fill(inforUser.email);
        }
    }

    //hàm đăng ký các thông tin không bắt buộc
    async addRegisterNotRequire(add : {country: string, date: string, inputfile: string, biography: string, rate: string, color: string, rating: string}) {
        await this.page.locator(this.locatorMaterial.xpathGender).check();
        await this.page.locator(this.locatorMaterial.xpathHobbies).check();
        await this.page.locator(this.locatorMaterial.xpathInterest).click();
        await this.page.locator(this.locatorMaterial.xpathCountry).selectOption(add.country);
        await this.page.locator(this.locatorMaterial.xpathDateOfBirth).fill(add.date);
        await this.page.locator(this.locatorMaterial.xpathProfilePicture).setInputFiles(add.inputfile);
        await this.page.locator(this.locatorMaterial.xpathBiography).fill(add.biography);
        await this.page.locator(this.locatorMaterial.xpathRate).fill(add.rate);
        await this.page.locator(this.locatorMaterial.xpathColor).fill(add.color);
        await this.page.locator(this.locatorMaterial.xpathNewLetter).check();
        await this.page.locator(this.locatorMaterial.xpathEnableFeatur).nth(3).click();
        await this.page.locator(this.locatorMaterial.xpathStarRating).click();
    }

    async clickRegister() {
        await this.page.locator(this.xpathBtnRegister).click();
    }

    //hàm lấy dòng cuối cùng của bảng
    getLastRow() {
        return this.tableBody.locator('tr').last();
    }

    //verify data đăng ký đúng
    async verifyDataRegister(inforUser: { userName: string; email: string }, add? : {country?: string, date?: string, inputfile?: string, biography?: string, rate?: string, color?: string, rating?: string}){
        const lastRow = this.getLastRow();

        // STT hiển thị cuối cùng (text của cột đầu tiên)
        const stt = await lastRow.locator('td').nth(0).textContent();
        await expect(Number(stt)).toBeGreaterThan(0);

        const realUserName = await lastRow.locator('td').nth(1).textContent();
        await expect(realUserName).toBe(inforUser.userName);

        const realEmail = await lastRow.locator('td').nth(2).textContent();
        await expect(realEmail).toBe(inforUser.email);

        const realInfor = await lastRow.locator('td').nth(3);
        if(!add) {
            await expect(realInfor).toContainText('Gender: null Hobbies: Country: usa Date of Birth: Biography: Rating: 5 Favorite Color: #ff0000 Newsletter: No Enable Feature: No Star Rating: 0⭐ Custom Date:');
        } else {
            await expect(realInfor).toContainText('Gender: male Hobbies: reading Country: canada Date of Birth: 2025-10-24 Biography: hahahahahahahahahahaha Rating: 5 Favorite Color: #ff66cc Newsletter: Yes Enable Feature: Yes Star Rating: 2.5⭐ Custom Date:'); 
        }

        const showButton1 = await lastRow.locator('td').nth(4).locator("//button[text()='Edit']");
        const showButton2 = await lastRow.locator('td').nth(4).locator("//button[text()='Delete']");
        await expect(showButton1).toBeVisible();
        await expect(showButton2).toBeVisible();
    }

    //Verify data đăng ký sai
    async verifyDataRegisterFail(inforUser: { userName?: string; email?: string}) {

        if((!inforUser.userName && !inforUser.email) || (!inforUser.userName && inforUser.email)) {
            const MgsError1 = await this.page.locator('#username').evaluate((el: HTMLInputElement) => el.validationMessage);
            await expect(MgsError1).toContain('Please fill out this field.')
        }

        if (inforUser.userName && !inforUser.email) {
            const MgsError2 = await this.page.locator('#email').evaluate((el: HTMLInputElement) => el.validationMessage);
            await expect(MgsError2).toContain('Please fill out this field.')
        }

        if (inforUser.userName && inforUser.email && !inforUser.email.includes('@')) {
            const MgsError3 = await this.page.locator('#email').evaluate((el: HTMLInputElement) => el.validationMessage);
            await expect(MgsError3).toContain(`Please include an '@' in the email address. '${inforUser.email}' is missing an '@'.`)
        }
    }

    //hàm xóa
    async delete() {
        const xpathBtnDelete = this.page.locator('//button[contains(text(), "Delete")]');
        const count = await xpathBtnDelete.count(); //số dòng trước khi xóa

        if (count > 0) {
            this.page.once('dialog', async dialog => dialog.accept());
            await this.page.locator('//button[contains(text(), "Delete")]').last().click()
        } else {
            console.log('không có delete để xóa, bỏ qua bước này');
        }

        //verify
        await this.page.reload();
        const afterCount = await xpathBtnDelete.count();
        await expect(afterCount).toBe(count-1);

    }
}