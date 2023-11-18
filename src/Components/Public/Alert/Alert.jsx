import Alert from 'react-bootstrap/Alert';

function AlertAkim(props) {
  const texthead = props.texthead;
  const text = props.text;
  const variant = props.variant
    return (
            <Alert variant={variant}>
                <Alert.Heading>{texthead}</Alert.Heading>
                <p>
                {text}
                </p>
            </Alert>
    );
}

export { AlertAkim }