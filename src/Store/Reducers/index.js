import {combineReducers} from 'redux'
import ExtraReducer from './ExtraReducer'
import PlanningRoleReducer from './PlanningRoleReducer'
import ProjectsReducer from './ProjectReducer'
import ResourcePoolReducer from './ResourcePoolReducer'
import UsersReducer from './UserReducer'
const rootReducer= combineReducers({
    Projects: ProjectsReducer,
    Users: UsersReducer,
    PlanningRoles: PlanningRoleReducer,
    ResourcePool:ResourcePoolReducer,
    ExtraObject:ExtraReducer
})
export default rootReducer