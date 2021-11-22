# Adding new private subnets - NAT routes issue

This demo project demonstrates an issue with extending an `awsx.ec2.vpc` component with additional private subnets after the initial creation of the VPC. Pulumi tries to recreate NAT Gateway routes for existing private subnets.

The VPC has subnets that are "hand-written" in order to better control the allocated subnet ranges across many subnets.

To re-create the issue.

1. Run `pulumi up`.
   You should now have three public subnets, three private subnets, and three NAT Gateways.
2. In `index.ts`, uncomment the block of new private subnets at line 70 => 93
3. Run `pulumi up`.
   The preview should at this stage indicate that Pulumi wants to delete and re-create the NAT routes in one or more of the existing private subnets. This is not expected. It looks as if there is some indexing going on in the underlying code that causes the ID of the original NAT routes to change.
4. Accept the changes in the preview and try to deploy.
   We now observe that the update fails as the existing subnets already have a route to `0.0.0.0/0` via NAT Gateways.

```
    error: 1 error occurred:
        * error creating Route in Route Table (rtb-04667be28ed19285a) with destination (0.0.0.0/0): RouteAlreadyExists: The route identified by 0.0.0.0/0 already exists.
        status code: 400, request id: 26a36fcd-dee6-47c4-b2a9-83c71db02a37
```
