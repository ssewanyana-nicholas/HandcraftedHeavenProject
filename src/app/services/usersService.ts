import sql from "@app/lib/db";
import { User } from "@app/lib/definitions";

// Create a new user
export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: "admin" | "client" | "seller"
): Promise<User> => {
  const [newUser] = await sql<User[]>`
    INSERT INTO users (name, email, password, role)
    VALUES (${name}, ${email}, ${password}, ${role})
    RETURNING id, name, email, password, role
  `;
  return newUser;
};

// Update a user by ID
export async function updateUser(
  id: number,
  name: string,
  email: string,
  password: string,
  role: string
) {
  const result = await sql`
    UPDATE users
    SET name = ${name}, email = ${email}, password = ${password}, role = ${role}
    WHERE id = ${id}
    RETURNING *;
  `;
  return result[0];
}

// Delete a user by ID
export async function deleteUser(id: number) {
  const result = await sql`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING *;
  `;
  return result[0];
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const users = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
  return users.length > 0 ? users[0] : null;
};

// Update a user's password
export const updateUserPassword = async (
  email: string,
  hashedPassword: string
): Promise<void> => {
  await sql`UPDATE users SET password = ${hashedPassword} WHERE email = ${email}`;
};


// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const users = await sql<User[]>`SELECT * FROM users`;
  return users;
};