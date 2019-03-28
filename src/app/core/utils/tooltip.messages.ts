export class TooltipMessages {
  public static SignatureTypeTooltip = 'With digital signatures you can choose between different signature types. ' +
  'The two types of signatures you can choose from here serve the exact same functional purpose. ' +
  'Therefore, if you do not know the technical differences between the two, you do not have to worry: ' +
  'simply choose the default option and we will handle the rest.';

  public static ControllerTooltip = 'The controller is the entity that will be making the signatures. ' +
  'This is usually the person behind the digital identity, but in case the digital identity is for a child, ' +
  'it can be the parent; if it is a document, it can be the company owning the document, etc. ' +
  'Leave this to the default, if you are not sure.';

  public static AliasTooltip = 'A human-readable nickname for the key you are creating. ' +
  'It can help differentiate between different keys more easily if you are creating many.';

  public static AuthenticationDropdownTooltip = 'Generate keys that will be used specifically for authentication purposes. ' +
  'You can re-use keys created in the previous step.';

  public static ServicesHeaderTooltip = 'Register services used by the DID. These can be authentication providers, ' +
  'messaging hubs, credential repositories for verifiable claims, etc.';

  public static ServicesHeaderBoldPartTooltip = 'DO NOT put links to personally identifiable information ' +
  '(such as social media profiles, email addresses, phone numbers, etc.)';

  public static ServiceTypeTooltip = 'Choose a human-readable description of the type of service, e.g. KYCProvider, ' +
  'CredentialRepositoryService, MessagingHub, etc.';

  public static ServiceEndpointTooltip = 'Specify the URL for the service, e.g. https://example.com/KYCProvider';

  public static EncryptHeaderTooltip = 'Choose a strong password to encrypt the private part of the DID.';

  public static EncryptHeaderBoldPartTooltip = 'Make sure you store the password in a safe location: ' +
  'there is no password recovery if you lose your password and you will be unable to sign messages with your DID keys!';
}
