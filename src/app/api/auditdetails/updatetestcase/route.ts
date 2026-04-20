/**
 * Audit Details - Update Test Case API Route
 * @description Handles PUT requests to update test case information
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleApiError, parseJsonBody } from '@/lib/api/errorHandler';
import { GMP_VENDOR_TEST_TYPES } from '@/types/audit';

// Extract valid GMP Vendor test type values
const validGMPVendorTestTypes = Object.values(GMP_VENDOR_TEST_TYPES) as string[];

const updateTestCaseSchema = z
  .object({
    auditType: z.string().optional(),
    testType: z.string().optional(),
    // Add other fields as needed
  })
  .passthrough(); // Allow additional fields

/**
 * PUT handler for update test case endpoint
 * Validates and accepts ISO 9001 in the testType field for GMP Vendor audits
 */
export async function PUT(request: NextRequest) {
  try {
    // Parse request body
    const body = await parseJsonBody(request);

    // Validate request body
    const validatedData = updateTestCaseSchema.parse(body);

    // Additional validation for GMP Vendor audit types
    if (validatedData.testType) {
      // Check if testType is a valid GMP Vendor test type (includes ISO 9001)
      if (!(validGMPVendorTestTypes as string[]).includes(validatedData.testType)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid test type. Must be one of: ${validGMPVendorTestTypes.join(', ')}`,
          },
          { status: 400 }
        );
      }
    }

    // In a real application, this would update the database
    // For now, return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Test case updated successfully',
        data: validatedData,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, '/api/auditdetails/updatetestcase');
  }
}
