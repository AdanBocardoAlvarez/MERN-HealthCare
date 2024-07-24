import { Environment } from './env';

const DevEnvironment: Environment = {
    db_url: "mongodb+srv://prem:^HP,Gi2dVT'eA4x@cluster0.cztu8cs.mongodb.net/DoctorDevDatabase?retryWrites=true&w=majority",
    jwt_secret_admin: 'yXZEp5wQWioOeYuQtjt5RYeoW4wf21sSlgCLQBfkvqYjQIeMUy403Rccboc7NvELg2no0GOJdBi',
    jwt_secret_consultant: 'h6XpIKvyAyDP8BbVGTUN87NsUOVHdmDbW79BJbblRpxnXlgO4OvEpPwcVNQYCtO3ho8hNRT8rrq',
    jwt_secret_client: 'nbiKHPL9YehymFk6RKmkB9eklTXqCom8dP7IWJAgyu8DBtgRkAHBRinPWLhxD0Sma0tJvKHiUeS',
    image_base_url: "https://vhealthy.fr:4000",
    backend_base_url: "https://vhealthy.fr:4000",
    backend_admin_url: "https://vhealthy.fr:4000/api/admin-panel",
    front_base_url: "https://vhealthy.fr/test/",
    SMS_API_URL: "http://www.smsgateway.center/SMSApi/rest/send",
    PAYMENT_PUBLIC_KEY: "rzp_test_D8yNhBzUemNZKj",
    PAYMENT_SECREAT_KEY: "sk_test_51O154ICZMCABegFKLBwoKj3Ah3OAmaxHNVqR5xzvLPOVwHQ4Ssh07huEpBPDIT0TEYAOfKbTkRFW8E5jFEe2KUf400Ol8ee3Gy",
    ZEGOCLOUD_APPID: 109064007,
    ZEGOCLOUD_SERVERSECRET: "133486dcbd3230f0a4b18ce4677c903d",
    API_KEY: "yopms0t7x5b4368z6zrf6gck8twhqia60yqy737mrkap54yk9fzv179jbrla",
    PAYPAL_MODE: "test",
    PAYPAL_CLIENT_ID: "AY5si6ayfOPEcDvvrKgMr6w1ZnN060PxWMTf-8etXl3eDYgt0rOJyo63jO8nsEQJlkmsyNiSCNi1rEIb",
    PAYPAL_CLIENT_SECRET: "EH4AcplaUP5-YBOKPHiQA7no2OeCDjOWOAplND1JebWTkmoPKr3qjLxaV3Rd_0tmd-XrnpCdskY5IXbJ",
};

export default DevEnvironment;
