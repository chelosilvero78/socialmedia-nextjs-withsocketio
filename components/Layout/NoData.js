import { Message, Button } from "semantic-ui-react";

export const NoProfilePosts = () => (
  <>
    <Message info icon="meh" header="Sorry" content="El usuario no ha publicado nada todavía!" />
    <Button icon="long arrow alternate left" content="Regresar" as="a" href="/" />
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <Message icon="user outline" info content={`El usuario no tiene seguidores`} />
    )}

    {followingComponent && (
      <Message icon="user outline" info content={`El usuario no sigue a ninguna usuario`} />
    )}
  </>
);

export const NoMessages = () => (
  <Message
    info
    icon="telegram plane"
    header="Lo siento"
    content="Aún no has enviado mensajes a nadie. ¡Busca arriba para enviar mensajes a alguien!"
  />
);

export const NoPosts = () => (
  <Message
    info
    icon="meh"
    header="Hey!"
    content="Sin publicaciones. Asegúrate de haber seguido a alguien."
  />
);

export const NoProfile = () => (
  <Message info icon="meh" header="Hey!" content="No se encontró ningún perfil." />
);

export const NoNotifications = () => (
  <Message content="Sin Notificaciones" icon="smile" info />
);

export const NoPostFound = () => (
  <Message info icon="meh" header="Hey!" content="No se ha encontrado ninguna publicación." />
);