<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;

class UserTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    public function can_get_all_users()
    {
        $users = factory(User::class)->create([
            'name' => 'test',
        ]);

        $response = $this->get('/api/users')->assertStatus(201);

        $this->assertNotNull($response->json());

        $response->assertJsonFragment([
            'name' => 'test',
        ]);
    }

    /** @test */
    public function can_create_user(){

        $this->withoutExceptionHandling();
        $response = $this->post('api/users', [
            'name' => 'test',
            'email' => 'test@gmail.com',
            'password' => bcrypt(123456),
        ])->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'name' => 'test',
            'email' => 'test@gmail.com',
        ]);
    }

    /** @test */
    public function can_edit_user(){

        $this->withoutExceptionHandling();

        $user = factory(User::class)->create();

        $response = $this->put('api/users/'.$user->id, [
            'name' => 'test',
            'email' => 'test@gmail.com',
        ])->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'name' => 'test',
            'email' => 'test@gmail.com',
        ]);
    }

}


