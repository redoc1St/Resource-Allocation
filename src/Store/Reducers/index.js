import {combineReducers} from 'redux'
import ExtraReducer from './ExtraReducer'
import GenRequestReducer from './GenRequestReducer'
import PlanningRoleReducer from './PlanningRoleReducer'
import ProjectsReducer from './ProjectReducer'
import ResourcePoolReducer from './ResourcePoolReducer'
import SpecRequestReducer from './SpecRequestReducer'
import UsersReducer from './UserReducer'
const rootReducer= combineReducers({
    Projects: ProjectsReducer,
    Users: UsersReducer,
    PlanningRoles: PlanningRoleReducer,
    ResourcePool:ResourcePoolReducer,
    ExtraObject:ExtraReducer,
    GenRequest:GenRequestReducer,
    SpecRequest:SpecRequestReducer
})
export default rootReducer