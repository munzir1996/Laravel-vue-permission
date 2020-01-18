<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Bordered Table</h3>
                    </div>
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#create-permission">
                        Create permission
                    </button>
                    <!-- Modal -->
                    <div class="modal" id="create-permission" aria-modal="true">
                        <div class="modal-dialog">
                            <form @submit.prevent="createPermission">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Create permission</h4>
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
                                <tr v-for="permission in permissions">
                                    <td>{{permission.id}}</td>
                                    <td>{{permission.name}}</td>
                                    <td>
                                        <button class="btn btn-primary" data-toggle="modal" @click="editModal(permission)"
                                        data-target="#edit-permission">
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
                    <div class="modal" id="edit-permission" aria-modal="true">
                        <div class="modal-dialog">
                            <form @submit.prevent="editPermission">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Edit permission</h4>
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
                                        <button type="submit" class="btn btn-primary" @click="editPermission()">
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
            createPermission() {
                this.form.post('api/permissions').then(() => {
                    this.$store.dispatch("allPermissions")
                    $('#create-permission').modal('hide');
                    this.form.reset();
                }).catch(() => {

                })

            },

            editModal(permission) {
                this.form.reset();
                this.form.fill(permission);
            },
            editPermission(){
                this.form.put('api/permissions/'+this.form.id).then(() => {
                    this.$store.dispatch("allPermissions")
                    $('#edit-permission').modal('hide');
                    this.form.reset();
                }).catch(() => {

                })
            }

        },
        mounted() {

            this.$store.dispatch("allPermissions")

        },
        computed: {
            permissions() { //final output from here
                return this.$store.getters.getPermissions
            },
        },
    }

</script>
