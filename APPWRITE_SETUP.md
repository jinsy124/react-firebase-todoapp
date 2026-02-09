# Appwrite Migration Setup Guide

You've successfully migrated from Firebase to Appwrite! Follow these steps to complete the setup:

## 1. Appwrite Account & Project Setup

1. Go to [Appwrite Cloud](https://cloud.appwrite.io) or set up self-hosted Appwrite
2. Create a new project or use an existing one
3. From the **Settings** page, copy your:
   - **Project ID** → `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
   - **API Endpoint** → `NEXT_PUBLIC_APPWRITE_ENDPOINT` (default: `https://cloud.appwrite.io/v1`)

## 2. Create Database and Collection

1. In your Appwrite console, go to **Databases**
2. Create a new database (or use existing)
   - Copy the **Database ID** → `NEXT_PUBLIC_APPWRITE_DATABASE_ID`

3. Inside the database, create a collection named "todos"
   - Copy the **Collection ID** → `NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID`

4. Add the following attributes to your "todos" collection:
   ```
   - title (String, Required)
   - completed (Boolean, Default: false)
   - userId (String, Required)
   - createdAt (DateTime)
   ```

## 3. Configure Environment Variables

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID=your_todos_collection_id_here
```

## 4. Set Permissions (Important!)

Your "todos" collection needs proper permissions for your app to work:

1. Go to your todos collection in Appwrite console
2. Click **Settings** → **Permissions**
3. Add permissions for your users to:
   - **Read**: `Role: User`
   - **Create**: `Role: User`
   - **Update**: `Role: User`
   - **Delete**: `Role: User`

## 5. Test Your App

Run the development server:
```bash
npm run dev
```

Test the following flows:
1. **Sign Up** - Create a new account
2. **Login** - Log in with your credentials
3. **Add Todo** - Create a new todo item
4. **Toggle Todo** - Mark as complete/incomplete
5. **Delete Todo** - Remove a todo
6. **Logout** - Sign out

## Files Changed

- ✅ Created: `src/lib/appwrite.ts` - Appwrite client configuration
- ✅ Updated: `src/context/AuthContext.tsx` - Appwrite authentication
- ✅ Updated: `src/app/login/page.tsx` - Appwrite login
- ✅ Updated: `src/app/signup/page.tsx` - Appwrite signup
- ✅ Updated: `src/app/todos/page.tsx` - Appwrite database operations
- ✅ Updated: `src/components/TodoForm.tsx` - Appwrite document creation

## Troubleshooting

**"Project ID not found" or similar errors:**
- Make sure all environment variables in `.env.local` are filled in correctly
- Restart your dev server after changing `.env` files

**"Missing collection" error:**
- Verify your Database ID and Collection ID are correct
- Ensure the collection "todos" exists in your database

**Permission errors when creating/updating todos:**
- Check the permissions on your "todos" collection
- Ensure "User" role has Create, Read, Update, and Delete permissions

**Authentication not working:**
- Check that your project ID is correct
- Verify your API endpoint is reachable

## API Documentation

For more information about Appwrite:
- [Appwrite Documentation](https://appwrite.io/docs)
- [JavaScript SDK](https://appwrite.io/docs/sdks/javascript)
