export const site = {
  name: 'Adailton Som',
  whatsappNumber: '558398037160',
  whatsappMessage: 'Olá! Gostaria de um orçamento para meu evento.',
};
export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;
export const services = [
  {
    icon: 'stage',
    name: 'Palcos',
    description: 'O espaço ideal para sua atração brilhar.',
  },
  {
    icon: 'fence',
    name: 'Fechamentos',
    description: 'Delimitação e organização para a área do evento.',
  },
  {
    icon: 'barrier',
    name: 'Grades de contenção',
    description: 'Controle de acesso e organização do público.',
  },
  {
    icon: 'room',
    name: 'Camarins',
    description: 'Conforto e privacidade nos bastidores.',
  },
  {
    icon: 'power',
    name: 'Grupos geradores',
    description: 'Energia para acompanhar o ritmo do seu evento.',
  },
  {
    icon: 'speaker',
    name: 'Sonorização',
    description: 'Clareza e potência em cada nota, em cada voz.',
  },
  {
    icon: 'screen',
    name: 'Painéis de LED',
    description: 'Imagens que ampliam a experiência do público.',
  },
  {
    icon: 'light',
    name: 'Iluminação',
    description: 'Luz, cor e atmosfera para cada momento.',
  },
] as const;
