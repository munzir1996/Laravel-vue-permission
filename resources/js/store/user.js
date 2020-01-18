export default {

	state: {

       users: [],
       roles: [],
       permissions: [],

	},

	getters: {

       getUsers(state){ //take parameter state

          return state.users
       },
       getRoles(state){ //take parameter state

        return state.roles
     },
     getPermissions(state){ //take parameter state

        return state.permissions
     },
	},

	actions: {
        allUsers(context){

          axios.get("api/users")
                .then((response)=>{
                    context.commit("users",response.data) //users will be run from mutation
                })
                .catch(()=>{
                    console.log("Error........")
                })
       },
       allRoles(context){

        axios.get("api/roles")
              .then((response)=>{
                  context.commit("roles",response.data) //roles will be run from mutation
              })
              .catch(()=>{
                  console.log("Error........")
              })
     },
     allPermissions(context){

        axios.get("api/permissions")
              .then((response)=>{
                  context.commit("permissions",response.data) //permissions will be run from mutation
              })
              .catch(()=>{
                  console.log("Error........")
              })
     },

	},

	mutations: {
       users(state,data) {
          return state.users = data
       },
       roles(state,data) {
        return state.roles = data
        },
        permissions(state,data) {
            return state.permissions = data
            },
	}
}
