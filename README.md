<!-- create folder -->

mkdir src/screens/main

mkdir src/screens/main/home/components
mkdir src/screens/main/home
touch src/screens/main/home/index.ts
touch src/screens/main/home/HomeScreen.tsx
touch src/screens/main/home/HomeScreen.hook.ts
touch src/screens/main/home/HomeScreen.style.ts

touch src/components/ModalConfirmation/ModalConfirmation.tsx
touch src/components/ModalConfirmation/index.ts

<!-- Auth -->

screen Login
screen Register
screen ForgotPassword
screen ResetPassword
screen Change Password
screen VerifyCode
Login gg , fb, apple

<!-- Main -->

screen home
navigation bar

finding friends
Detail Friend
Create profile

<!-- film -->

Category film
banner film in category
getAll film
list film by type
list film bảng xếp hạng

detail film

<!-- Api -->

- login
  /api/auth/login
  parameter
  {
  email:string;
  password:string;
  }
- register
  /api/auth/register
  parameter
  {
  username:string;
  email:string;
  password:string;
  }
- login gg apple , facebook
  /api/auth/login/google
  /api/auth/login/facebook
  /api/auth/login/apple
  {
  username:string;
  email:string;
  password:string;
  type:'google'|'facebook'|'apple',
  idLogin:number
  }

- get profile user
  /api/user/profile

{
  email
  phone
  name
  avatar
  <!-- ngày sinh , giới tính , sở thích -->
  <!-- ngày sinh -->

}


  <!--  -->
- get list film (filter by category , type ,search ,...)
  /api/films
  parameter
  {
  page:number;
  size:number;
  category?:string;
  type?:string;
  search?:string
  }

- get detail film

- get list chapter (filter by category , type,search ,...)
  /api/chapter
  parameter
  {
  page:number;
  size:number;
  category?:string;
  type?:string;
  search?:string
  }

