import ButtonSignInGoogle from "./components/ButtonSignInGoogle";
import FormSignIn from "./components/FormSignIn";

export default function page() {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <FormSignIn />
      <ButtonSignInGoogle />
    </div>
  );
}
