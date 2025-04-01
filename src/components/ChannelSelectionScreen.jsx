import { Checkbox, Group, Stack, Button, Text } from '@mantine/core';

function ChannelSelectionScreen({ formData, updateFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { checked, value } = e.currentTarget;
    
    let newChannels = [...formData.channels];
    
    if (checked) {
      newChannels.push(value); // Agregar canal seleccionado
    } else {
      newChannels = newChannels.filter(channel => channel !== value); // Eliminar canal deseleccionado
    }
    
    updateFormData({ channels: newChannels }); // Actualizar datos del formulario
  };

  const handleNext = () => {
    if (formData.channels.length > 0) {
      nextStep(); // Avanzar al siguiente paso
    }
  };

  return (
    <Stack spacing="lg">
      <Text fw={500} size="lg">Seleccion de Canales:</Text>
      
      <Checkbox
        label="SMS"
        value="sms"
        checked={formData.channels.includes('sms')}
        onChange={handleChange}
      />
      
      <Checkbox
        label="Correo Electrónico"
        value="email"
        checked={formData.channels.includes('email')}
        onChange={handleChange}
      />
      
      <Checkbox
        label="WhatsApp"
        value="whatsapp"
        checked={formData.channels.includes('whatsapp')}
        onChange={handleChange}
      />

      <Group position="apart">
        <Button variant="outline" onClick={prevStep}>
          Atrás
        </Button>
        <Button onClick={handleNext} disabled={formData.channels.length === 0}>
          Siguiente
        </Button>
      </Group>
    </Stack>
  );
}

export default ChannelSelectionScreen;
