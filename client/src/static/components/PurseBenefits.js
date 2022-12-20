import { Collapse, Typography } from "antd";

const PurseBenefits = () => {
    return (
        <span>
            <Typography.Title level={2}>Why to use Purse?
            </Typography.Title>

            <Typography.Paragraph>
                Anyone who earns and spends cash money, especially people who earn only in cash can use purse to develop good financial habits.
            </Typography.Paragraph>

            {/* <Typography.Title level={2}>Who can use Purse?
            </Typography.Title>

            <Typography.Paragraph>
                Anyone who earns and spends cash money, especially people who earn only in cash.
            </Typography.Paragraph> */}

            <Collapse>
                <Collapse.Panel header="Vendors" key="1">
                    <Typography.Paragraph>
                        For example, shoemakers who work at train stations. They buy their raw materials in cash and earn their livelyhood in cash. They can see category - wise comparisons of their income/expenses.
                    </Typography.Paragraph>
                </Collapse.Panel>

                <Collapse.Panel header="Household maids, nannies and cooks" key="2">
                    <Typography.Paragraph>
                        They spend the entire day outside, earning in cash and incur expenses on food and refreshments like tea. All their expenses, bills, etc. are made in cash. They can start accounting their cash transactions. This will help them stay on top of their spending and they will develop money saving habits. They can also choose to get email reminders for recurring earnings such as salary, etc. They can choose to get email reminders for recurring expenses such as house - rent, their kid's school fees, etc.
                    </Typography.Paragraph>
                </Collapse.Panel>

                <Collapse.Panel header="Employers of household maids, nannies and cooks" key="3">
                    <Typography.Paragraph>
                        People employ maids, cooks and nannies at their homes. They pay their salary in cash. So they can choose to get an email reminder for recurring expenses such as their maid, nanny or cook's salary, etc.
                    </Typography.Paragraph>
                </Collapse.Panel>

                <Collapse.Panel header="Parents and students" key="4">
                    <Typography.Paragraph>
                        Parents give pocket money to their children in cash. Some parents have kids who attend schools and colleges which are far away from their house. These students get travel expenses in cash. Some people have recurring expenses such as their bills, students' fees, etc. Parents can share their kid's user credentials to add income records whenever they give any pocket money or travel money. Young children can use this website and develop good financial habits. Parents can stay ahead of their bills and never pay any late fees by getting email reminders for recurring expenses such as cable/dish TV bill electricity bill, phone bill/recharge, Wi-Fi/broadband internet bill, etc.
                    </Typography.Paragraph>
                </Collapse.Panel>
            </Collapse>
        </span>
    );
}

export default PurseBenefits;