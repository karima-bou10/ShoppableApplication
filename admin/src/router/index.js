import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "@/components/HelloWorld"
import StepProgress from "@/components/StepProgress" 
Vue.use(Router)
export default new Router({
    routes:[
    {
        path:'/',
        name:'Hello',
        component: HelloWorld
    },
        // Add a route for StepProgress
        {
            path: '/step-progress',
            name: 'StepProgress',
            component: StepProgress
        }
]
})