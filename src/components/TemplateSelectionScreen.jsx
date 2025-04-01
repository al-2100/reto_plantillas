import { Radio, Group, Stack, Button, Text } from '@mantine/core';

function TemplateSelectionScreen({ formData, updateFormData, nextStep }) {
  // Reinicia datos posteriores al cambiar la plantilla
  const handleChange = (value) => {
    updateFormData({
      templateType: value,
      channels: [],
      smsMessage: '',
      emailSubject: '',
      emailMessage: '',
      whatsappMessage: ''
    });
  };

  const handleNext = () => {
    if (formData.templateType) {
      nextStep(); // Avanzar al siguiente paso
    }
  };

  return (
    <Stack spacing="lg">
      <Text fw={500} size="lg">Selección de Plantilla:</Text>
      
      <Radio.Group
        value={formData.templateType}
        onChange={handleChange}
        name="templateType"
        withAsterisk
      >
        <Group mt="xs">
          <Radio value="invitation" label="Invitación" />
          <Radio value="reminder" label="Recordatorio" />
          <Radio value="custom" label="Personalizado" />
        </Group>
      </Radio.Group>

      <Button onClick={handleNext} disabled={!formData.templateType}>
        Siguiente
      </Button>
    </Stack>
  );
}

export default TemplateSelectionScreen;
