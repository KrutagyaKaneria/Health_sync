import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";

export default function AppointmentConfirmation({ date, time, doctor }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container>
          <Heading>Your Appointment is Confirmed! 🎉</Heading>
          <Text>Hello,</Text>
          <Text>
            Your appointment has been successfully booked. Here are the details:
          </Text>
          <Text>
            📅 <strong>Date:</strong> {date}
            <br />
            ⏰ <strong>Time:</strong> {time}
            <br />
            👨‍⚕️ <strong>Doctor:</strong> {doctor}
          </Text>
          <Text>Thank you for using HealthSync!</Text>
        </Container>
      </Body>
    </Html>
  );
}
