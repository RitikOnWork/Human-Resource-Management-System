import java.util.Arrays;

public class PerformanceAIEngine {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.err.println("Usage: java PerformanceAIEngine <scores_comma_separated>");
            System.exit(1);
        }

        try {
            String[] scoresStr = args[0].split(",");
            double[] scores = new double[scoresStr.length];
            double sum = 0;

            for (int i = 0; i < scoresStr.length; i++) {
                scores[i] = Double.parseDouble(scoresStr[i].trim());
                sum += scores[i];
            }

            double currentScore = scores[scores.length - 1];
            double average = sum / scores.length;
            
            // Simple linear regression to project next score
            double xSum = 0, ySum = 0, xxSum = 0, xySum = 0;
            int n = scores.length;
            for (int i = 0; i < n; i++) {
                xSum += i;
                ySum += scores[i];
                xxSum += (i * i);
                xySum += (i * scores[i]);
            }
            double slope = (n * xySum - xSum * ySum) / (n * xxSum - xSum * xSum);
            double intercept = (ySum - slope * xSum) / n;
            double projectedNextScore = slope * n + intercept;
            
            // Cap the score
            if (projectedNextScore > 10.0) projectedNextScore = 10.0;
            if (projectedNextScore < 0.0) projectedNextScore = 0.0;

            String trend = slope > 0.05 ? "Improving" : (slope < -0.05 ? "Declining" : "Stable");
            
            String recommendation = "Maintain consistency.";
            if (slope > 0.1) recommendation = "Excellent momentum! Keep up the great work.";
            else if (slope < -0.1) recommendation = "Your performance is dipping. Consider a 1-on-1 with your manager.";
            else if (currentScore > 9.0) recommendation = "Top tier performance. You are in the top 5% of the department.";
            else if (currentScore < 6.0) recommendation = "Immediate improvement required. Focus on assigned tasks.";

            System.out.println("{");
            System.out.printf("  \"status\": \"success\",\n");
            System.out.printf("  \"currentScore\": %.1f,\n", currentScore);
            System.out.printf("  \"averageScore\": %.1f,\n", average);
            System.out.printf("  \"trend\": \"%s\",\n", trend);
            System.out.printf("  \"projectedNextScore\": %.1f,\n", projectedNextScore);
            System.out.printf("  \"recommendation\": \"%s\"\n", recommendation);
            System.out.println("}");

        } catch (Exception e) {
            System.err.println("{\"status\": \"error\", \"message\": \"Invalid dataset format\"}");
            System.exit(1);
        }
    }
}
