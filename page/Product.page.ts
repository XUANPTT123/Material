import { expect, Locator, Page, test } from '@playwright/test';
import { MaterialPage } from './Material';

export class ProductPage extends MaterialPage {
    page: Page;
    ProductURL = '02-xpath-product-page.html';

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async gotoProductPage() {
        const product = this.baseURL + this.ProductURL;
        await this.page.goto(product);
    }

    async addItem(item: string, quality: number) {
        const button = await this.page.locator(`//div[text()='${item}']/following-sibling::button[@class= 'add-to-cart']`);
        for(let i = 0; i < quality; i++) {
            await button.click();
        }
    }

    async verifyShoppingCart (){
        
    }

}