import { Icon, Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <Message
      color="teal"
      attached
      header={signupRoute ? "Empezar" : "Bienvenido de nuevo :) "}
      icon={signupRoute ? "settings" : "privacy"}
      content={signupRoute ? "Crear Nueva Cuenta" : "Iniciar Sesion con Email y Contraseña"}
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      {signupRoute ? (
        <>
          <Message attached="bottom" warning>
            <Icon name="help" />
            Usuario existente? <Link href="/login">Inicie sesion aqui</Link>
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message attached="bottom" info>
            <Icon name="lock" />
            <Link href="/reset">Has olvidado tu contraseña?</Link>
          </Message>

          <Message attached="bottom" warning>
            <Icon name="help" />
            Nuevo Usuario? <Link href="/signup">Registrate aqui</Link> 
          </Message>
        </>
      )}
    </>
  );
};