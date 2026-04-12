public class AttendanceEngine {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.err.println("Usage: java AttendanceEngine <hours_comma_separated>");
            System.exit(1);
        }

        try {
            String[] hoursStr = args[0].split(",");
            double totalHours = 0;
            double standardHoursPerDay = 8.0;
            double overtimeHours = 0;
            double deficitHours = 0;
            int daysPresent = 0;

            for (String hStr : hoursStr) {
                double hours = Double.parseDouble(hStr.trim());
                if (hours > 0) {
                    daysPresent++;
                    totalHours += hours;
                    if (hours > standardHoursPerDay) {
                        overtimeHours += (hours - standardHoursPerDay);
                    } else if (hours < standardHoursPerDay) {
                        deficitHours += (standardHoursPerDay - hours);
                    }
                }
            }

            double utilization = (totalHours / (daysPresent * standardHoursPerDay)) * 100.0;

            System.out.println("{");
            System.out.printf("  \"status\": \"success\",\n");
            System.out.printf("  \"totalHours\": %.2f,\n", totalHours);
            System.out.printf("  \"daysPresent\": %d,\n", daysPresent);
            System.out.printf("  \"overtimeHours\": %.2f,\n", overtimeHours);
            System.out.printf("  \"deficitHours\": %.2f,\n", deficitHours);
            System.out.printf("  \"utilizationRate\": %.1f\n", utilization);
            System.out.println("}");

        } catch (Exception e) {
            System.err.println("{\"status\": \"error\", \"message\": \"Invalid dataset format\"}");
            System.exit(1);
        }
    }
}
