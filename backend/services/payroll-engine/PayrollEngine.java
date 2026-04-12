import java.util.Scanner;

/**
 * Java Payroll Engine - Enterprise Calculation Core
 * This class handles high-precision salary calculations for the HRMS system.
 */
public class PayrollEngine {
    public static void main(String[] args) {
        // We use a simple CLI interface to communicate with Node.js
        if (args.length < 2) {
            System.err.println("Usage: java PayrollEngine <baseSalary> <taxPercentage>");
            System.exit(1);
        }

        try {
            double baseSalary = Double.parseDouble(args[0]);
            double taxRate = Double.parseDouble(args[1]);

            // Complex Enterprise Logic
            double hra = baseSalary * 0.40; // House Rent Allowance (40%)
            double pf = baseSalary * 0.12;  // Provident Fund (12%)
            double grossSalary = baseSalary + hra;
            double taxableIncome = grossSalary - pf;
            double taxAmount = taxableIncome * (taxRate / 100);
            double netSalary = grossSalary - pf - taxAmount;

            // Output in a format Node.js can easily parse
            System.out.println("{");
            System.out.printf("  \"status\": \"success\",\n");
            System.out.printf("  \"engine\": \"Java HotSpot(TM) 64-Bit Server VM\",\n");
            System.out.printf("  \"baseSalary\": %.2f,\n", baseSalary);
            System.out.printf("  \"hra\": %.2f,\n", hra);
            System.out.printf("  \"pf\": %.2f,\n", pf);
            System.out.printf("  \"taxApplied\": %.2f,\n", taxAmount);
            System.out.printf("  \"netSalary\": %.2f\n", netSalary);
            System.out.println("}");

        } catch (NumberFormatException e) {
            System.err.println("{\"status\": \"error\", \"message\": \"Invalid numeric input\"}");
            System.exit(1);
        }
    }
}
