import {combineReducers} from 'redux'
import PlanningRoleReducer from './PlanningRoleReducer'
import ProjectsReducer from './ProjectReducer'
import ResourcePoolReducer from './ResourcePoolReducer'
import UsersReducer from './UserReducer'
const rootReducer= combineReducers({
    Projects: ProjectsReducer,
    Users: UsersReducer,
    PlanningRoles: PlanningRoleReducer,
    ResourcePool:ResourcePoolReducer
})
export default rootReducer