import { Stack, Button, Paper, Text, Title, Code, Group } from '@mantine/core';
import { useEffect } from 'react';

function ResultScreen({ formData, prevStep }) {
  useEffect(() => {
    // Registrar los datos finales del formulario
    console.log('Configuración de plantilla completada:', formData);
  }, [formData]);

  const handleFinish = () => {
    console.log('CONFIGURACIÓN FINAL:', formData);
    
    // Registrar mensajes específicos por canal
    if (formData.channels.includes('sms')) {
      console.log('Mensaje SMS:', formData.smsMessage);
    }
    
    if (formData.channels.includes('email')) {
      console.log('Asunto del correo:', formData.emailSubject);
      console.log('Mensaje del correo:', formData.emailMessage);
    }
    
    if (formData.channels.includes('whatsapp')) {
      console.log('Mensaje de WhatsApp:', formData.whatsappMessage);
    }
    
    alert('Configuración completada. Revisa la consola para ver los detalles.');
  };

  return (
    <Stack spacing="lg">
      <Title order={3}>Configuración Completada</Title>
      
      <Text>Tipo de plantilla: {
        formData.templateType === 'invitation' ? 'Invitación' : 
        formData.templateType === 'reminder' ? 'Recordatorio' : 'Personalizado'
      }</Text>
      
      <Text>Canales seleccionados: {
        formData.channels.map(channel => {
          if (channel === 'sms') return 'SMS';
          if (channel === 'email') return 'Correo Electrónico';
          if (channel === 'whatsapp') return 'WhatsApp';
          return channel;
        }).join(', ')
      }</Text>
      
      {formData.channels.includes('sms') && (
        <Paper withBorder p="md">
          <Title order={4}>SMS</Title>
          <Code block>{formData.smsMessage}</Code>
        </Paper>
      )}
      
      {formData.channels.includes('email') && (
        <Paper withBorder p="md">
          <Title order={4}>Correo Electrónico</Title>
          <Text fw={700}>Asunto: {formData.emailSubject}</Text>
          <Code block>{formData.emailMessage}</Code>
        </Paper>
      )}
      
      {formData.channels.includes('whatsapp') && (
        <Paper withBorder p="md">
          <Title order={4}>WhatsApp</Title>
          <Code block>{formData.whatsappMessage}</Code>
        </Paper>
      )}
      
      <Group position="apart">
        <Button variant="outline" onClick={prevStep}>
          Atrás
        </Button>
        <Button onClick={handleFinish} color="green">
          Finalizar
        </Button>
      </Group>
    </Stack>
  );
}

export default ResultScreen;
