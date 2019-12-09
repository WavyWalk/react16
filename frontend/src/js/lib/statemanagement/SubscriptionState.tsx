import {useEffect, useState} from "react";

export class SubscriptionState {

    protected lastSubscribedComponentId = 0

    protected subscribedComponents: { [id: number]: any } = {}

    public use(): this {
        const subscriptionEffect = () => {
            let [{state}, updateState] = useState({state: this})
            useEffect(() => {
                let id = this.getNextSubscribedComponentId()
                this.subscribe(id, updateState)
                return () => {
                    this.unsubscribe(id)
                }
            }, [])
            return this
        };
        return subscriptionEffect()
    }

    protected getNextSubscribedComponentId() {
        return this.lastSubscribedComponentId += 1
    }

    protected subscribe(id: number, updateFunction: any) {
        this.subscribedComponents[id] = updateFunction
    }

    protected unsubscribe(id: number) {
        delete this.subscribedComponents[id]
    }

    protected updateSubscribedComponents() {
        const stateValue = {state: this}
        for (let updateFunction of Object.values(this.subscribedComponents)) {
            updateFunction(stateValue)
        }
    }
}
