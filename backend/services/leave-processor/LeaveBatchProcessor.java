public class LeaveBatchProcessor {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.err.println("Usage: java LeaveBatchProcessor <balance_comma_tenure>");
            System.exit(1);
        }

        try {
            // Expecting input like "15.0,3" (15 days left, 3 years tenure)
            String[] params = args[0].split(",");
            if (params.length < 2) throw new Exception("Invalid params");
            
            double currentBalance = Double.parseDouble(params[0].trim());
            int tenureYears = Integer.parseInt(params[1].trim());

            double maxRollover = 10.0;
            double standardGrant = 20.0;
            
            double rolledOver = 0.0;
            double forfeited = 0.0;

            if (currentBalance > maxRollover) {
                rolledOver = maxRollover;
                forfeited = currentBalance - maxRollover;
            } else {
                rolledOver = currentBalance;
                forfeited = 0.0;
            }

            // Tenure Bonus Math
            double bonusDays = 0.0;
            if (tenureYears >= 5 && tenureYears < 10) bonusDays = 3.0;
            if (tenureYears >= 10) bonusDays = 5.0;

            double newBalance = standardGrant + rolledOver + bonusDays;

            System.out.println("{");
            System.out.printf("  \"status\": \"success\",\n");
            System.out.printf("  \"rolledOverDays\": %.1f,\n", rolledOver);
            System.out.printf("  \"forfeitedDays\": %.1f,\n", forfeited);
            System.out.printf("  \"loyaltyBonusDays\": %.1f,\n", bonusDays);
            System.out.printf("  \"newTotalBalance\": %.1f\n", newBalance);
            System.out.println("}");

        } catch (Exception e) {
            System.err.println("{\"status\": \"error\", \"message\": \"Failed to process batch rollover: " + e.getMessage() + "\"}");
            System.exit(1);
        }
    }
}
