import { useState, useEffect } from 'react'
import { Container, Paper } from '@mantine/core'
import './App.css'

import TemplateSelectionScreen from './components/TemplateSelectionScreen'
import ChannelSelectionScreen from './components/ChannelSelectionScreen'
import SmsConfigScreen from './components/SmsConfigScreen'
import EmailConfigScreen from './components/EmailConfigScreen'
import WhatsAppConfigScreen from './components/WhatsAppConfigScreen'
import ResultScreen from './components/ResultScreen'

function App() {
	// Estado de datos del formulario
	const [formData, setFormData] = useState({
		templateType: '',
		channels: [],
		smsMessage: '',
		emailSubject: '',
		emailMessage: '',
		whatsappMessage: ''
	})

	// Paso actual y secuencia de pantallas
	const [currentStep, setCurrentStep] = useState(0)
	const [screenSequence, setScreenSequence] = useState([0, 1])

	useEffect(() => {
		if (currentStep > 1) {
			const nuevaSecuencia = [0, 1]
			
			if (formData.channels.includes('sms')) {
				nuevaSecuencia.push(nuevaSecuencia.length)
			}
			
			if (formData.channels.includes('email')) {
				nuevaSecuencia.push(nuevaSecuencia.length)
			}
			
			if (formData.channels.includes('whatsapp')) {
				nuevaSecuencia.push(nuevaSecuencia.length)
			}
			
			nuevaSecuencia.push(nuevaSecuencia.length)
			
			setScreenSequence(nuevaSecuencia)
		}
	}, [formData.channels, currentStep])

	const updateFormData = (newData) => {
		setFormData(prev => ({ ...prev, ...newData }))
	}

	const nextStep = () => {
		setCurrentStep(prev => prev + 1)
	}

	const prevStep = () => {
		setCurrentStep(prev => prev - 1)
	}

	const getCurrentScreen = () => {
		if (currentStep === 0)
			return <TemplateSelectionScreen formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
		
		if (currentStep === 1)
			return <ChannelSelectionScreen formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
		
		const channelIndex = currentStep - 2
		const channels = formData.channels
		
		if (channelIndex < channels.length) {
			const channel = channels[channelIndex]
			switch (channel) {
				case 'sms':
					return <SmsConfigScreen formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
				case 'email':
					return <EmailConfigScreen formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
				case 'whatsapp':
					return <WhatsAppConfigScreen formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
				default:
					return null
			}
		}
		
		return <ResultScreen formData={formData} prevStep={prevStep} />
	}

	return (
		<Container style={{ maxWidth: '1200px', width: '100%' }}>
			<Paper shadow="md" p="md" withBorder>
				{getCurrentScreen()}
			</Paper>
		</Container>
	)
}

export default App
