import 'reflect-metadata';
import { container } from "tsyringe";
import AccountService from "../../../src/domain/services/AccountService";

describe("Account Service Tests", () => {

    let accountService = container.resolve(AccountService)

    test("Reset state before starting tests", () => {
        expect(accountService.reset()).toBeUndefined()        
    });



});