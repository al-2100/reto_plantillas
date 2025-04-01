import { Textarea, Stack, Button, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

function SmsConfigScreen({ formData, updateFormData, nextStep, prevStep }) {
  const [message, setMessage] = useState(formData.smsMessage);
  
  useEffect(() => {
    // Establecer mensajes predeterminados si no están configurados
    if (!message && formData.templateType !== 'custom') {
      let defaultMessage = '';
      
      if (formData.templateType === 'invitation') {
        defaultMessage = 'Hola [Nombre], te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!'; // Mensaje de invitación
      } else if (formData.templateType === 'reminder') {
        defaultMessage = 'Hola [Nombre], te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!'; // Mensaje de recordatorio
      }
      
      setMessage(defaultMessage); // Establecer mensaje predeterminado
      updateFormData({ smsMessage: defaultMessage }); // Actualizar datos del formulario
    }
  }, [formData.templateType]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleNext = () => {
    updateFormData({ smsMessage: message });
    nextStep();
  };

  return (
    <Stack spacing="lg" className="screen-container">
      <Text fw={500} size="lg">Sms</Text>
      
      <Textarea
        label="Mensaje"
        placeholder="Escribe el mensaje SMS"
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

export default SmsConfigScreen;
