import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';

const regionOutput = pulumi.output(aws.getRegion());

regionOutput.apply((region) => {
    createVpc(region.id);
});

function createVpc(region: string) {
    const vpc = new awsx.ec2.Vpc('demo-vpc', {
        cidrBlock: '10.1.0.0/16',
        tags: {
            Name: 'demo-vpc',
        },
        numberOfNatGateways: 3,
        subnets: [
            // Public subnets
            {
                type: 'public',
                name: 'public-1',
                location: {
                    cidrBlock: '10.1.0.0/22',
                    availabilityZone: `${region}a`,
                },
            },
            {
                type: 'public',
                name: 'public-2',
                location: {
                    cidrBlock: '10.1.4.0/22',
                    availabilityZone: `${region}b`,
                },
            },
            {
                type: 'public',
                name: 'public-3',
                location: {
                    cidrBlock: '10.1.8.0/22',
                    availabilityZone: `${region}c`,
                },
            },
            // Private subnets - 1st block
            {
                type: 'private',
                name: 'private-1-1',
                location: {
                    cidrBlock: '10.1.100.0/28',
                    availabilityZone: `${region}a`,
                },
            },
            {
                type: 'private',
                name: 'private-1-2',
                location: {
                    cidrBlock: '10.1.100.16/28',
                    availabilityZone: `${region}b`,
                },
            },
            {
                type: 'private',
                name: 'private-1-3',
                location: {
                    cidrBlock: '10.1.100.32/28',
                    availabilityZone: `${region}c`,
                },
            },
            // Private subnets - 2nd block
            {
                type: 'private',
                name: 'private-2-1',
                location: {
                    cidrBlock: '10.1.100.48/28',
                    availabilityZone: `${region}a`,
                },
            },
            {
                type: 'private',
                name: 'private-2-2',
                location: {
                    cidrBlock: '10.1.100.64/28',
                    availabilityZone: `${region}b`,
                },
            },
            {
                type: 'private',
                name: 'private-2-3',
                location: {
                    cidrBlock: '10.1.100.80/28',
                    availabilityZone: `${region}c`,
                },
            },
        ],
    });
}
