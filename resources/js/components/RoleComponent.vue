<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Bordered Table</h3>
                    </div>
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#create-role">
                        Create Role
                    </button>
                    <!-- Modal -->
                    <div class="modal" id="create-role" aria-modal="true">
                        <div class="modal-dialog">
                            <form @submit.prevent="createRole">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Create role</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input v-model="form.name" type="text" name="name" class="form-control"
                                                :class="{ 'is-invalid': form.errors.has('name') }">
                                            <has-error :form="form" field="name"></has-error>
                                        </div>
                                    </div>

                                    <div class="modal-footer justify-content-between">
                                        <button type="button" class="btn btn-default"
                                            data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                                <!-- /.modal-content -->
                            </form>
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="role in roles">
                                    <td>{{role.id}}</td>
                                    <td>{{role.name}}</td>
                                    <td>
                                        <button class="btn btn-primary" data-toggle="modal" @click="editModal(role)"
                                        data-target="#edit-role">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer clearfix">
                        <ul class="pagination pagination-sm m-0 float-right">
                            <li class="page-item"><a class="page-link" href="#">«</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">»</a></li>
                        </ul>
                    </div>
                    <!-- -->
                    <!-- Modal -->
                    <div class="modal" id="edit-role" aria-modal="true">
                        <div class="modal-dialog">
                            <form @submit.prevent="editRole">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Edit role</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input v-model="form.name" type="text" name="name" class="form-control"
                                                :class="{ 'is-invalid': form.errors.has('name') }">
                                            <has-error :form="form" field="name"></has-error>
                                        </div>
                                    </div>

                                    <div class="modal-footer justify-content-between">
                                        <button type="button" class="btn btn-default"
                                            data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary" @click="editRole()">
                                            Save</button>
                                    </div>
                                </div>
                                <!-- /.modal-content -->
                            </form>
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- -->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: new Form({
                    id: '',
                    name: '',
                })
            }
        },
        methods: {
            createRole() {
                this.form.post('api/roles').then(() => {
                    this.$store.dispatch("allRoles")
                    $('#create-role').modal('hide');
                    this.form.reset();
                }).catch(() => {

                })

            },

            editModal(role) {
                this.form.reset();
                this.form.fill(role);
            },
            editRole(){
                this.form.put('api/roles/'+this.form.id).then(() => {
                    this.$store.dispatch("allRoles")
                    $('#edit-role').modal('hide');
                    this.form.reset();
                }).catch(() => {

                })
            }

        },
        mounted() {

            this.$store.dispatch("allRoles")

        },
        computed: {
            roles() { //final output from here
                return this.$store.getters.getRoles
            },
        },
    }

</script>
