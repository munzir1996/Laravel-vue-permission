<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleTest extends TestCase
{
    /** @test */
    public function can_get_all_roles()
    {
        $roles = factory(Role::class)->create([
            'name' => 'test',
        ]);

        $response = $this->get('/api/roles')->assertStatus(201);

        $this->assertNotNull($response->json());

        $response->assertJsonFragment([
            'name' => 'test',
        ]);
    }

    /** @test */
    public function can_create_role(){

        $this->withoutExceptionHandling();
        $response = $this->post('api/roles', [
            'name' => 'test',
        ])->assertStatus(201);

        $this->assertDatabaseHas('roles', [
            'name' => 'test',
        ]);
    }

}
