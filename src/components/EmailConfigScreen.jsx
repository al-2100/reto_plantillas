import { TextInput, Textarea, Stack, Button, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

function EmailConfigScreen({ formData, updateFormData, nextStep, prevStep }) {
  const [subject, setSubject] = useState(formData.emailSubject);
  const [message, setMessage] = useState(formData.emailMessage);
  
  useEffect(() => {
    // Establecer mensajes predeterminados si no están configurados
    if (formData.templateType !== 'custom' && (!subject || !message)) {
      let defaultSubject = '';
      let defaultMessage = '';
      
      if (formData.templateType === 'invitation') {
        defaultSubject = 'Invitación al proceso de [nombre del proceso]'; // Asunto de invitación
        defaultMessage = 'Estimado/a [Nombre],\n\nEsperamos que te encuentres bien. A través de este medio, queremos invitarte a participar en el proceso de [nombre del proceso], que se llevará a cabo el [fecha] a las [hora]. El lugar del encuentro será [dirección/sala virtual].\n\nTu participación es muy importante para nosotros. Agradeceríamos que confirmes tu asistencia respondiendo a este correo.\n\nQuedamos atentos a cualquier consulta que puedas tener.\n\nCordialmente,\n[Nombre del remitente]\n[Puesto]\n[Empresa/Organización]'; // Mensaje de invitación
      } else if (formData.templateType === 'reminder') {
        defaultSubject = 'Recordatorio del proceso de [nombre del proceso]'; // Asunto de recordatorio
        defaultMessage = 'Estimado/a [Nombre],\n\nQueremos recordarte que el proceso de [nombre del proceso], al que amablemente confirmaste tu asistencia, se realizará el [fecha] a las [hora]. El evento tendrá lugar en [dirección/sala virtual].\n\nSi tienes alguna duda o necesitas asistencia previa, no dudes en contactarnos.\n\nTe esperamos puntual.\n\nSaludos cordiales,\n[Nombre del remitente]\n[Puesto]\n[Empresa/Organización]'; // Mensaje de recordatorio
      }
      
      setSubject(defaultSubject); // Establecer asunto predeterminado
      setMessage(defaultMessage); // Establecer mensaje predeterminado
      updateFormData({ 
        emailSubject: defaultSubject,
        emailMessage: defaultMessage 
      }); // Actualizar datos del formulario
    }
  }, [formData.templateType]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleNext = () => {
    updateFormData({ 
      emailSubject: subject,
      emailMessage: message 
    });
    nextStep();
  };

  return (
    <Stack spacing="lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Text fw={500} size="lg">Correo electrónico</Text>
      
      <TextInput
        label="Asunto"
        placeholder="Escribe el asunto del correo"
        value={subject}
        onChange={handleSubjectChange}
      />
      
      <Textarea
        label="Mensaje"
        placeholder="Escribe el contenido del correo"
        value={message}
        onChange={handleMessageChange}
        minRows={6}
        autosize
        style={{ width: '100%' }}
      />

      <Group position="apart">
        <Button variant="outline" onClick={prevStep}>
          Atrás
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!subject.trim() || !message.trim()}
        >
          Siguiente
        </Button>
      </Group>
    </Stack>
  );
}

export default EmailConfigScreen;
