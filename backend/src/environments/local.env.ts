import { Environment } from './env';

const LocalEnvironment: Environment = {
    db_url: "mongodb://localhost:27017/DoctorProducationDatabase?retryWrites=true&w=majority",
    jwt_secret_admin: 'yXZEp5wQWioOeYuQtjt5RYeoW4wf21sSlgCLQBfkvqYjQIeMUy403Rccboc7NvELg2no0GOJdBi',
    jwt_secret_consultant: 'h6XpIKvyAyDP8BbVGTUN87NsUOVHdmDbW79BJbblRpxnXlgO4OvEpPwcVNQYCtO3ho8hNRT8rrq',
    jwt_secret_client: 'nbiKHPL9YehymFk6RKmkB9eklTXqCom8dP7IWJAgyu8DBtgRkAHBRinPWLhxD0Sma0tJvKHiUeS',
    image_base_url: "http://localhost:5000",
    backend_admin_url: "http://localhost:5000/api/admin-panel",
    backend_base_url: "http://localhost:5000",
    front_base_url: "http://localhost:5000/",
    SMS_API_URL: "http://www.smsgateway.center/SMSApi/rest/send",
    PAYMENT_PUBLIC_KEY: "pk_test_51O154ICZMCABegFKDSRkTaQWuhnlViRJ3kdpPojihe8v0boUgf5ckZlyvKOSpHdSDccM4sxK3sVGY2e3cmUZRDQe00996E2FbL",
    PAYMENT_SECREAT_KEY: "sk_test_51O154ICZMCABegFKLBwoKj3Ah3OAmaxHNVqR5xzvLPOVwHQ4Ssh07huEpBPDIT0TEYAOfKbTkRFW8E5jFEe2KUf400Ol8ee3Gy",
    ZEGOCLOUD_APPID: 109064007,
    ZEGOCLOUD_SERVERSECRET: "133486dcbd3230f0a4b18ce4677c903d",
    API_KEY: "yopms0t7x5b4368z6zrf6gck8twhqia60yqy737mrkap54yk9fzv179jbrla",
    PAYPAL_MODE: "test",
    PAYPAL_CLIENT_ID: "AY5si6ayfOPEcDvvrKgMr6w1ZnN060PxWMTf-8etXl3eDYgt0rOJyo63jO8nsEQJlkmsyNiSCNi1rEIb",
    PAYPAL_CLIENT_SECRET: "EH4AcplaUP5-YBOKPHiQA7no2OeCDjOWOAplND1JebWTkmoPKr3qjLxaV3Rd_0tmd-XrnpCdskY5IXbJ",
};

export default LocalEnvironment;
