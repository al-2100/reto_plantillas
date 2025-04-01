import { Textarea, Stack, Button, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

function WhatsAppConfigScreen({ formData, updateFormData, nextStep, prevStep }) {
  const [message, setMessage] = useState(formData.whatsappMessage);
  
  useEffect(() => {
    if (!message && formData.templateType !== 'custom') {
      let defaultMessage = '';
      
      if (formData.templateType === 'invitation') {
        defaultMessage = 'Hola [Nombre], te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!';
      } else if (formData.templateType === 'reminder') {
        defaultMessage = 'Hola [Nombre], te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!';
      }
      
      setMessage(defaultMessage);
      updateFormData({ whatsappMessage: defaultMessage });
    }
  }, [formData.templateType]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleNext = () => {
    updateFormData({ whatsappMessage: message });
    nextStep();
  };

  return (
    <Stack spacing="lg" className="screen-container">
      <Text fw={500} size="lg">WhatsApp</Text>
      
      <Textarea
        label="Mensaje"
        placeholder="Escribe el mensaje de WhatsApp"
        value={message}
        onChange={handleChange}
        minRows={4}
        autosize
        style={{ width: '100%' }}
      />

      <Group position="apart">
        <Button variant="outline" onClick={prevStep}>
          Atrás
        </Button>
        <Button onClick={handleNext} disabled={!message.trim()}>
          Siguiente
        </Button>
      </Group>
    </Stack>
  );
}

export default WhatsAppConfigScreen;
