import "ts-jest"
import {AuthUser} from "../../src/Domain/AuthUser/AuthUser"
import { FullName } from "../../src/Domain/AuthUser/ValueObject/FullName";

describe("Subscriptions Tests",()=>{
    test("create a valid subscription ",()=>{
        const user = new AuthUser("jose",new FullName("Jose","Morales"),["Shopper"],"josemowa45321@gmail.com","joseluis123qwe","refreshtoken",[],[]);
        const subscriptionExpected = "Drama"

        user.addSubscription("Drama")

        expect(user.subscriptions).toContainEqual(subscriptionExpected)
    })
    test("trying a duplicate subscription",()=>{
        const user = new AuthUser("jose",new FullName("Jose","Morales"),["Shopper"],"josemowa45321@gmail.com","joseluis123qwe","refreshtoken",[],[]);

        for (let index = 0; index < 3; index++) {
            user.addSubscription("Drama")
        }

        expect(user.subscriptions).toHaveLength(1)

    })
})
