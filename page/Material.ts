import {Page, test} from '@playwright/test';

export class MaterialPage {
    page: Page;
    baseURL: string = 'https://material.playwrightvn.com/';

    constructor(page: Page) {
        this.page = page;
    }

    async gotoMaterial(){
        await this.page.goto(this.baseURL);
    }
}