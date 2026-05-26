export type Tool = {
  name: string
  /**
   * Base name only (no extension). Upload one file to public/images/tools/
   * — e.g. python.png or mqtt.svg
   */
  logo: string
  url?: string
}

export const tools: Tool[] = [
  { name: 'Python', logo: 'python', url: 'https://www.python.org' },
  {
    name: 'JavaScript',
    logo: 'javascript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  { name: 'Snap Seven', logo: 'snap7' },
  { name: 'Modbus TCP/IP', logo: 'modbus', url: 'https://modbus.org' },
  { name: 'MQTT', logo: 'mqtt', url: 'https://mqtt.org' },
  { name: 'AMQP', logo: 'amqp' },
  { name: 'RabbitMQ', logo: 'rabbitmq', url: 'https://www.rabbitmq.com' },
  {
    name: 'SAP Intelligent RPA Cloud Studio',
    logo: 'sap-irpa',
    url: 'https://www.sap.com/products/technology-platform/process-automation.html',
  },
  { name: 'MongoDB', logo: 'mongodb', url: 'https://www.mongodb.com/atlas' },
  {
    name: 'SQL Server Management Studio',
    logo: 'sql-server',
    url: 'https://www.microsoft.com/sql-server',
  },
  { name: 'Windows Virtual Machine', logo: 'windows', url: 'https://www.microsoft.com/windows' },
  {
    name: 'Azure DevOps',
    logo: 'azure-devops',
    url: 'https://azure.microsoft.com/products/devops',
  },
  { name: 'DeepSeek', logo: 'deepseek', url: 'https://www.deepseek.com' },
  { name: 'Cursor AI', logo: 'cursor', url: 'https://cursor.com' },
  { name: 'Visual Studio Code', logo: 'vscode', url: 'https://code.visualstudio.com' },
  { name: 'Jira', logo: 'jira', url: 'https://www.atlassian.com/software/jira' },
  { name: 'ClickUp', logo: 'clickup', url: 'https://clickup.com' },
]
